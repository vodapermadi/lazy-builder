import { handlePost, postImage } from "./server/action"
import GaleriComponents from "./components/Galeri"
import { findData, insertOne } from "@/lib/action"
import { useSearchParams } from "next/navigation"
import AccountComponents from "./components/Account"
import { useState } from "react"
import { v4 } from "uuid"
import PostMessage from "./components/PostMessage"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from "axios"

const FacebookCrawling = ({ user }) => {
	const routes = useSearchParams()
	const [loading, setLoading] = useState({
		status: false,
		message: ""
	})

	const handleGaleri = async (e) => {
		e.preventDefault()
		setLoading({
			status: true,
			message: "posting image"
		})
		const formData = new FormData(e.target)

		formData.append('id_user', user)
		formData.append('mode', 'img_upload')
		postImage(formData).then((res) => {
			insertOne('images', {
				source: res?.data.base64,
				path: res?.data.path,
				id_user: user
			}).then(() => {
				setLoading({
					status: true,
					message: "complete upload"
				})

				setTimeout(() => {
					window.location.reload()
				}, 300);
			})
		})
	}

	const handleAccount = async (e) => {
		e.preventDefault()
		setLoading({
			status: true,
			message: "proses add data"
		})
		const formData = new FormData(e.target)
		let data = []
		for (let i = 0; i < formData.getAll('cookie').length; i++) {
			data.push({
				cookie: formData.getAll('cookie')[i],
				id_account: v4(),
				account_link: formData.getAll('account_link')[i],
				ua: formData.getAll('ua')[i],
				grup_join: formData.getAll('grup_join')[i] !== "" ? formData.getAll('grup_join')[i].split(';') : "",
			})
		}

		let result = {
			id_user: user,
			mode: "join_grup",
			data: data
		}

		handlePost(result).then((row) => {
			insertOne('resource', {
				cookie: row.data[0]?.cookie_path,
				id_account: row.data[0]?.id_account,
				id_user: user
			}).then(() => {
				setLoading({
					status: true,
					message: "complete"
				})

				setTimeout(() => {
					window.location.reload()
				}, 400)
			})
		})
	}

	const handleMessage = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)

		await findData('resource', {
			filter: {
				id_user: String(user)
			}
		}).then((res) => {
			let data = []
			for(let i = 0;i < res?.length;i++){
				if (formData.get('type') === "text"){
					data.push({
						cookie_path:res[i]?.cookie,
						id_account:res[i]?.id_account,
						text:formData.get('text'),
						type:formData.get('type')
					})
				}else{
					data.push({
						cookie_path: res[i]?.cookie,
						id_account: res[i]?.id_account,
						path: formData.get('path'),
						type: formData.get('type'),
						text: formData.get('text')
					})
				}
			}
			let json = {
				type: formData.get('metode'),
				post_at: formData.get('post_at'),
				id_user: user,
				mode:"post_message",
				data:data
			}

			handlePost(json).then((res) => {
				console.log(res)
			})
		})

		// let json = {
		// 	data:data
		// }
		// handlePost()
	}

	return (
		<>
			{loading.status && (
				<Alert>
					<AlertDescription>
						{loading.message}
					</AlertDescription>
				</Alert>
			)}
			{routes.get('side') === "galeri" && (
				<GaleriComponents user={user} handleGaleri={handleGaleri} />
			)}

			{routes.get('side') === "account" && (
				<AccountComponents user={user} handleForm={handleAccount} />
			)}

			{routes.get('side') === "message" && (
				<PostMessage user={user} handleMessage={handleMessage} />
			)}
		</>
	)
}

export default FacebookCrawling