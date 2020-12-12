import firebase from "firebase"

export const createNewPost = (title, body, images, author, link, props) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('/api/forum', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    author: author,
                    link: link
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()

            function uploadPic() {
                return new Promise(async (resolve) => {
                    for (var i = 0; i < images.length; i++) {
                        var imageFile = images[i];
                        // this.uploadImageAsPromise(imageFile, i+1);
                        const ref = firebase.storage().ref("posts/" + data.id + '_' + i.toString())
                        await ref.put(imageFile)
                        let url = await ref.getDownloadURL()
                        urls.push(url)
                    }
                    resolve("upload")
                });
            }
            
            let urls = []
            await uploadPic()

            await fetch('/api/forum/' + data.id + '/pics', {
                method: 'PATCH',
                body: JSON.stringify({ urls }),
                headers: { 'Content-Type': 'application/json' }
            })
            props.history.push('/')
        } catch (err) {
            console.log(err)
        }
    }
}

