import { data } from "jquery";
import React, { useEffect, useState } from "react";
import Task from "./task.jsx";
//create your first component

const Home = () => {
	const [dataApi, setDataApi] = useState([]);
	const [myList, setmyList] = useState("");
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/BryanTello", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setDataApi(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (dataApi.length) {
			setmyList(
				dataApi.map((dataApi, index) => {
					return (
						<Task
							Text={dataApi.label}
							id={index}
							key={index.toString()}
							delete={deleteApi}
						/>
					);
				})
			);
		}
	}, [dataApi]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/BryanTello", {
			method: "PUT",
			body: JSON.stringify(dataApi),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [dataApi]);

	const deleteApi = indexDelete => {
		setDataApi(dataApi.filter((_, index) => index !== indexDelete));
	};

	return (
		<div className="container text-center">
			<h1>To Do List Fetch</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}>
				<input
					id="task"
					type="text"
					placeholder="Add something to do!"
					onKeyPress={e => {
						if (e.target.value != " ") {
							if (e.key === "Enter") {
								{
									setDataApi([
										...dataApi,
										{ label: e.target.value, done: false }
									]);
									e.target.value = "";
								}
							}
						}
					}}></input>
			</form>
			<div>
				<ol className="ol.color">{myList}</ol>
			</div>
		</div>
	);
};

export default Home;
