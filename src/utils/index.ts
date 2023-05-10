const buyArticle=(selected)=>{
	let articles=localStorage.getItem("boughtArticle");
	if(articles.every((article)=>article.name!=selected.name)){
		let currNow= localStorage.getItem('balance')-selected.price
		if(currNow<0){
			return "Fail"
		}
		else{
			localStorage.setItem('balance', currNow)
			localStorage.setItem('boughtArticle',[...articles,selected])
			return "Success"
		}
	}
	return "Fail"
}

