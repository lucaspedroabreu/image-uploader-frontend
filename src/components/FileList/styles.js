import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;

  li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	color: #444

		& + li {
			margin-top: 15px;
		}

		& + div {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			align-content: baseline;

		}

		a {
			margin: 5px;
			align-self: center;
		}
  }
`;

export const FileInfo = styled.div`
	display: flex;
	align-items: center;
	align-content: center;

	div {
		display: flex;
		align-content: center;
		flex-direction: column;
		min-width: 58px;

		span {
			font-size: 12px;
			color: #999;
			margin-top: 5px;

			button {
				border: 0;
				background: transparent;
				cursor: pointer;
				color: #e57878;
				margin-left: 5px;
				font-weight: 500;
			}
		}
	}
`;

export const Preview = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 5px;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	margin-right: 10px;
`;
