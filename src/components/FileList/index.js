import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError , MdLink } from 'react-icons/md'

import { Container , FileInfo, Preview } from './styles';

const FileList = ({ files, handleDelete }) => (
	<Container>
		{ files.map(uploadedFile => (
			<li key={uploadedFile.id}>
				<FileInfo>
					<Preview src={uploadedFile.preview} />
					<div>
						<strong>{uploadedFile.name}</strong>
						<span>
							{uploadedFile.readableSize}
							{uploadedFile.url && <button onClick={() => handleDelete(uploadedFile.id)}>Excluir</button>}
							{!uploadedFile.uploaded && <button onClick={() => {}}>Cancelar</button>}
						</span>
					</div>
				</FileInfo>
				<div class="status">
					{!uploadedFile.uploaded && !uploadedFile.error && (
						<CircularProgressbar
							styles={{
								root: { width: 24},
								path: { stroke: '#7159c1'}
							}}
							strokeWidth={10}
							value={uploadedFile.progress}
						/>
					)}
					{uploadedFile.url && (
						<a
							href={uploadedFile.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<MdLink size={24} color="#222" />
						</a>
					)}

					{uploadedFile.uploaded && (
						<MdCheckCircle size={24} color="#78e5d5" />
					)}
					{uploadedFile.error && (
						<MdError size={24} color="#e57878" />
					)}

				</div>
			</li>
		))}
	</Container>
)
export default FileList
