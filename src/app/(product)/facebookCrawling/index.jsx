import { handlePost, postImage } from "./server/action"
import GaleriComponents from "./components/Galeri"
import { deleteOne, findData, insertMany, insertOne } from "@/lib/action"
import { useSearchParams } from "next/navigation"
import AccountComponents from "./components/Account"
import { useState } from "react"
import { v4 } from "uuid"
import PostMessage from "./components/PostMessage"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

	const handleDelete = (path) => {
		if (window.confirm("yakin??")) {
			postImage({
				mode: "img_delete",
				path: path
			}).then((row) => {
				deleteOne("images", {path:path}).then((res) => {
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
			let manipulation = []
			data.forEach((row) => {
				manipulation.push({
					id_account: row.id_account,
					account_link:row.account_link,
					id_user:user
				})
			})

			insertMany('resource', manipulation).then(() => {
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
		setLoading({
			status: true,
			message: "proses add data"
		})
		const formData = new FormData(e.target)

		let data = []
		for (let i = 0; i < formData.getAll('cookie_path').length; i++) {
			if (formData.get('type') === "text") {
				data.push({
					cookie_path: formData.getAll('cookie_path')[i],
					id_account: formData.getAll('cookie_path')[i].split('/')[7],
					text: formData.get('text'),
					type: formData.get('type'),
					link_grup: formData.get('grup') !== null ? formData.getAll('grup') : "",
				})
			} else {
				data.push({
					cookie_path: formData.getAll('cookie_path')[i],
					id_account: formData.getAll('cookie_path')[i].split('/')[7],
					path: formData.get('path'),
					type: formData.get('type'),
					text: formData.get('text'),
					link_grup: formData.get('grup') !== null ? formData.getAll('grup') : "",
				})
			}
		}
		let json = {
			type: formData.get('metode'),
			post_at: formData.get('post_at'),
			id_user: user,
			mode: "post_message",
			data: data
		}

		handlePost(json).then((res) => {
			insertOne('posting', {
				json
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

	const getGrup = async (val) => {
		const response = await handlePost(val)
		return response.data
	}

	return (
		<>
			{loading.status && (
				<Alert className="bg-blue-600/30 border border-blue-400">
					<AlertDescription className="font-bold text-lg">
						{loading.message}
					</AlertDescription>
				</Alert>
			)}
			{routes.get('side') === "galeri" && (
				<GaleriComponents deleteImage={handleDelete} user={user} handleGaleri={handleGaleri} />
			)}

			{routes.get('side') === "account" && (
				<AccountComponents user={user} handleForm={handleAccount} />
			)}

			{routes.get('side') === "message" && (
				<PostMessage user={user} handleMessage={handleMessage} grup={getGrup} />
			)}
		</>
	)
}

export default FacebookCrawling