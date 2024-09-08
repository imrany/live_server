Anvel is an open-source, cross platform program that lets people share files and folderson their network. 
#### Get all latest version here

| __Anvel versions__ | __Status__ | __Release Date__ | __Releases__ |
|--------------------|------------|------------------|--------------|
| v0.2.6 | LTS - Recommended for most users | 2024-05-26 | [Releases](./releases.md) |
| v0.2.3 | Obsolete - Not maintained | 2024-03-19 | [Releases](./releases.md) |
| v0.2.2 | Obsolete - Not maintained | 2024-03-18 | [Releases](./releases.md) |
| v0.2.1 | Obsolete - Not Maintained | 2024-03-18 | [Releases](./releases.md) |
| v0.2.0 | Obsolete - Not Maintained | 2024-03-16 | [Releases](./releases.md) |

To get all previous releases, go to [Releases](./releases.md)

#### How to setup Anvel

#### Linux
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


#### Windows
* Download the latest windows release.

* extract the `.zip` folder, rename the folder to `anvel` move the folder to `C:/Program Files`.

* copy the path to anvel's bin folder, that is `C:/Program Files/anvel/bin`.

* Open `Environment variables` by searching on the `Start` menu.

* On user variables, under `Path`, press `New` then paste `C:/Program Files/anvel/bin`.

* Press apply then ok.


### Docker
#### Building Anvel Docker Image
```bash
docker build -t anvel .
```
This will download and build the Anvel app inside the Docker container.

#### Running the Dockerized Anvel app
```bash
docker run -it --rm anvel
```

