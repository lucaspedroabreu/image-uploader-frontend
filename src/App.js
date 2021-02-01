import React, { Component } from 'react'
import { uniqueId } from 'lodash'
import filesize from 'filesize'

import api from './services/api'

import GlobalStyle from './styles/global'

import { Container, Content } from './styles/App'

import Upload from './components/Upload'
import FileList from './components/FileList'

class App extends Component {
	state = {
		uploadedFiles: []
	}

	async componentDidMount() {
		const response = await api.get('/images')

		this.setState({
			uploadedFiles: response.data.map(image => ({
				id: image._id,
				name: image.imageName,
				readableSize: filesize(image.imageSize),
				preview: image.imageURL,
				uploaded: true,
				url: image.imageURL,
			}))
		})
	}
	handleUpload = files => {
		const sizeLimit = 10 * 1024 * 1024
		let uploadedSize = this.state.uploadedFiles.forEach(image => uploadedSize += image.data)

		if (uploadedSize >= sizeLimit) {
			throw new Error(`Limite de espaço de armazenamento de ${sizeLimit} Mb`)
		}

		const committedFiles = files.map(file => ({
			file,
			id: uniqueId(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null,
		}))

		this.setState({
			uploadedFiles: this.state.uploadedFiles.concat(committedFiles)
		})

		committedFiles.forEach(this.processUpload)
	}

	updateFileProgress = (id, progressData) => {
		this.setState({ uploadedFiles: this.state.uploadedFiles.map(file => {
			return id === file.id ? { ...file, ...progressData } : file
		})})
	}

	processUpload = (committedFile) => {
		const data = new FormData()

		data.append('imageFile', committedFile.file, committedFile.name)

		const options = {
			onUploadProgress: event => {
				const progress = parseInt(Math.round( (event.loaded * 100) / event.total ))

				this.updateFileProgress(committedFile.id, { progress })
			}
		}

		api
			.post('/images', data, options)
			.then((response) => {
				this.updateFileProgress(committedFile.id, {
					uploaded: true,
					id: response.data._id,
					url: response.data.imageURL
				})
			})
			.catch((response) => {
				this.updateFileProgress(committedFile.id, {
					error: true
				})
			})
	}

	handleDelete = async (id) => {
		await api.delete(`/images/${id}`)

		this.setState({
			uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
		})
	}

	componentWillUnmount() {
		this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.url))
	}
	render() {
		const { uploadedFiles } = this.state
		return (
				<Container>
					<Content>
						<Upload handleUpload={this.handleUpload} />
						{ !!uploadedFiles.length && (<FileList files={uploadedFiles} handleDelete={this.handleDelete}/>)}
					</Content>
					<GlobalStyle />
				</Container>
		)
	}
}

export default App
