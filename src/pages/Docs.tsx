// @flow strict
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Docs() {
	useEffect(()=>{
		document.title="Anvel • Docs"
	},[])
	return (
		<div className="my-0 mx-auto max-w-3xl text-center">
			<p className="p-6 text-4xl">Docs page</p>
			<Link to="/">Back home</Link>
		</div>
	);
};

export default Docs;