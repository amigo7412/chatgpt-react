import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

const configuration = new Configuration({
	organization: process.env.REACT_APP_OPENAI_ORG_ID,
	apiKey: process.env.REACT_APP_OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

function App() {
	const [msg, setMsg] = useState<string>('')
	const [chats, setChats] = useState<string[]>([])
	const [isTyping, setIsTyping] = useState<boolean>(false)

	const chat = async (e: any) => {
		e.preventDefault();

		if (!msg) {
			return;
		}

		setIsTyping((prev) => true);
		await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: 'user', content: msg }]
		}).then((res: any) => {
			setChats([...chats, res.data.choices[0]?.message.content]);
			setMsg('');
		}).catch((e) => {
			console.log(e);
		})
		setIsTyping((prev) => false);
	}

	return (
		<div className='container'>
			<div className='status'>
				{isTyping && <p>Typing...</p>}
			</div>
			<form action="" onSubmit={(e) => chat(e)}>
				<input
					type="text"
					className='input'
					placeholder='Input a message'
					onChange={(e) => setMsg(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default App;
