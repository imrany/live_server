# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## To Run
```bash
 npm run tauri dev
```


__Anvel__ is a networking program for file sharing.

## Looking for latest release of a version branch?

| __Anvel versions__ | __Status__ | __Release Date__ | __Releases__ |
|--------------------|------------|------------------|--------------|
| v0.2.3 | LTS - Recommended for most users | 2023-03-19 | [Releases](./releases.md) |
| v0.2.2 | Obsolete - Not maintained | 2023-03-18 | [Releases](./releases.md) |
| v0.2.1 | Obsolete - Not Maintained | 2023-03-18 | [Releases](./releases.md) |
| v0.2.0 | Obsolete - Not Maintained | 2023-03-16 | [Releases](./releases.md) |

To get all previous releases, go to [Releases](./releases.md)

## How to setup Anvel

### Linux
* Download the latest linux release
* extract the `.tar.gz` folder, rename the folder to `anvel` move the folder to `~`

```bash
tar -xf anvel.tar.gz && mv anvel ~
```
* open `.bashrc` and edith the `PATH` variable

```bash
cd ~ && nano .bashrc
```
* edit `.bashrc`
```bash
export PATH=$PATH:/home/<Your-Username>/anvel/bin
```
Replace `<Your-Username>` with your username.


### Windows
* Download the latest windows release.

* extract the `.zip` folder, rename the folder to `anvel` move the folder to `C:/Program Files`.

* copy the path to anvel's bin folder, that is `C:/Program Files/anvel/bin`.

* Open `Environment variables` by searching on the `Start` menu.

* On user variables, under `Path`, press `New` then paste `C:/Program Files/anvel/bin`.

* Press apply then ok.


### Testing
Testing if anvel is configured correctly. Open `cmd` then type `anvel --help` press enter.
You will get 
```bash
A networking program for file sharing..

Usage: anvel [OPTIONS] [COMMAND]

Commands:
  serve  Serves a specific folder
  help   Print this message or the help of the given subcommand(s)

Options:
  -r, --root <PATH>  Path to the folder you want to serve
  -h, --help         Print help
  -V, --version      Print version
```
This means it's correctly installed and configure.


## Usage 

### Open Anvel
To launch anvel click on `anvel.exe` or run 
```bash
anvel
```

### To serve a folder
Use it to serve static files from a folder, example serving a website locally.

```bash
anvel serve /path-to-static-folder
```
Example: to serve your current directory.
```bash
anvel serve ./
```
anvel will look for the root `index.html` and serve it or it will provide a list of files and folders in that directory you are serving if it doesn't find `index.html`.
