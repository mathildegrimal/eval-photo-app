<h3 align="center">My photo app</h3>

## 🧐 About <a name = "about"></a>
An app project with Expo to take, save and share pictures.
## ✍️ Author <a name = "authors"></a>

- [Mathilde Grimal](https://github.com/mathildegrimal) - Initial work

## ⛏️ Built Using <a name = "built_using"></a>
- TypeScript
- Expo / react native
- Redux toolkit
- Async storage
- @rneui/themed (BottomSheet)


## Run Project

You need to run :

`npm i`

To start you need to run :

`npm run start`

You can upload photos on a node server (See the implementation of the server [here](https://github.com/humqn/server_picture_node)).
If you choose not to use the server, please comment this part of components/PictureItem to avoid problems of request crashing.

```ts
 /**** comment this part if node server is not listening *** /
             *
             */
            const formData = new FormData();
            const uriToSend = Platform.OS === 'ios' ? uriToAdd.split('file://')[1] : uriToAdd;
            const image = { name:'picture', type:'image/jpg', uri: uriToSend };

            // @ts-ignore
            formData.append('photo', image );

            await axios.patch('http://10.50.37.166:7070/multipart-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest: () => {
                    return formData; // this is doing the trick
                }
            });
            ////////
```

## Usage

You can :
- save the picture into redux and async storage
- save the picture in your gallery and on a node server
- switch camera for selfies or normal pictures
- delete a photo clicking on the trash icon
- share the photo with you friends using share icon

## Improvements

