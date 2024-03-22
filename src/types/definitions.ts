export type ErrorBody={
    error_type?:string,
    error_code?:string,
    message:string,
    solution?:any
}

export interface NetworkInformation{
	internal:string,
	external:string
}
export interface SendFileInfo{
	name:string,
	path:string,
	recipient_server:string
}

export interface Configurations{
	recipient_ip:string
}

export type UserPreference={
	backgroundImage:string,
}

export type ChooseBackground={
	name:string,
	image:string
}

export interface Content{
	root:string,
	path:string,
	name:string,
	metadata:{
		is_file:boolean,
		file_extension:string,
	}
}

export interface Notifications{
	priority:string,
	message:string
}

export interface Folder{
    contents:Content[]
}
