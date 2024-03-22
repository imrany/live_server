use open::that;

pub async fn launch_browser(url:&String)->Result<(),std::io::Error>{
   that(&url)
}