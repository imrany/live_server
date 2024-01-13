use actix_web::{
    HttpResponse,
    Responder,
    get,
    HttpRequest,
    web,
    Result
};
use actix_files::NamedFile;
use std::{
    fs,
    path,
};
use serde::{
    Serialize,
    // Deserialize,
};
use std::process::Command;
use local_ip_address::local_ip;
use reqwest;

#[derive(Serialize)]
struct DirectoryObject {
    id: u32,
    name:String,
    path:path::PathBuf,
    metadata:FileMeta
}
#[derive(Serialize)]
struct FileMeta{
    is_file:bool,
    file_extension:Option<String>,
}

#[derive(Serialize)]
struct DirectoryContent {
    contents: Vec<DirectoryObject>,
}

#[derive(Serialize)]
struct ErrorMessage{
    message: String,
}

#[derive(Serialize)]
struct Ip {
    internal: String,
    external: String,
}


pub struct AppState {
    pub root_dir: path::PathBuf,
}

#[get("/directory_content")]
pub async fn directory_content(state: web::Data<AppState>)-> HttpResponse{
    let directory_path=path::Path::new("./resources");

    let root_dir=&state.root_dir.as_path();
    println!("{}", root_dir.display());
    // Read the directory contents
    let contents = match fs::read_dir(directory_path) {
        Ok(entries) => {
            let mut contents = Vec::new();
            for entry in entries {
                if let Ok(entry) = entry {
                    if let Some(file_name) = entry.file_name().to_str() {
                        let metadata= FileMeta{
                            is_file:directory_path.join(file_name.to_owned()).is_file(),
                            file_extension: if directory_path.join(file_name.to_owned()).is_file() {
                                Some(format!("{}",directory_path.join(file_name.to_owned()).extension().unwrap().to_str().unwrap()))
                            }else{
                                Some(String::from("Folder"))
                            },
                        };
                        let directory_object=DirectoryObject {
                            id:2,
                            name:file_name.to_owned(),
                            path:directory_path.join(file_name.to_owned()),
                            metadata
                        };
                        contents.push(directory_object);
                    }
                }
            }
            contents
        }
        Err(_) => {
            return HttpResponse::InternalServerError().body("Failed to read directory");
        }
    };

     // Create a response containing the directory content as JSON
    let directory_content = DirectoryContent { contents };
    match serde_json::to_string(&directory_content) {
        Ok(json_string) => HttpResponse::Ok().json(json_string),
        Err(_) => HttpResponse::InternalServerError().body("Failed to serialize to JSON"),
    }
}

#[get("/{filename:.*}")]
pub async fn open_file_by_name(req: HttpRequest) -> Result<NamedFile> {
    let path: path::PathBuf = req.match_info().query("filename").parse().unwrap();
    Ok(NamedFile::open(path)?)
}

#[get("/{filename:.*}")]
pub async fn open_file_by_name_local(req: HttpRequest) -> impl Responder {
    let file_path: path::PathBuf = req.match_info().query("filename").parse().unwrap();
    // On Windows, use the "start" command to open the file with the default program
    #[cfg(target_os="windows")]
    {
        let open_cmd=Command::new("cmd")
            .args(&["/C", "start", "", &file_path])
            .spawn();

        if let Ok(file) = open_cmd {
            println!("{:?}", file);
            return HttpResponse::Ok().json("File opened");
        }else {
            return HttpResponse::InternalServerError().json("Failed to open file");
        };
    }
    // On Linux or macOS, use "xdg-open" to open the file with the default program
    #[cfg(not(target_os="windows"))]
    {
        let open_cmd=Command::new("xdg-open")
            .arg(&file_path)
            .spawn();
            
        if let Ok(file) = open_cmd {
            println!("{:?}", file);
            return HttpResponse::Ok().json("File opened");
        }else {
            return HttpResponse::InternalServerError().json("Failed to open file");
        };
    }
}

#[get("/get_ip_address")]
pub async fn get_ip_address()-> impl Responder {
    if let Ok(internal_ip) = local_ip() {
        // Make a request to httpbin to get the external IP address
        if let Ok(response) = reqwest::get("https://httpbin.org/ip").await{
            // Parse the JSON response to extract the IP address
            let ip_address: serde_json::Value = response.json().await.unwrap();
            let ip_external = ip_address["origin"].as_str().unwrap_or("Unknown");
            let ip=Ip{
                internal: internal_ip.to_string(),
                external: ip_external.to_string()
            };
            println!("External IP Address: {}", ip.external);
            let json_response=serde_json::to_string(&ip).unwrap();
            return HttpResponse::Ok().json(json_response);
        }else {
            let ip=Ip{
                internal: internal_ip.to_string(),
                external: "Failed to get external IP Address".to_string()
            };
            let json_response = serde_json::to_string(&ip).unwrap();
            return HttpResponse::Ok().json(json_response);
        };
    }else {
        let err_message=ErrorMessage{
            message: "Failed to get local IP Address".to_string()
        };
        let json_response = serde_json::to_string(&err_message).unwrap();
        return HttpResponse::InternalServerError().json(json_response);
    }
}

pub async fn hello_world() -> impl Responder { 
    HttpResponse::Ok().body("Hello world!")
}