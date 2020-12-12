import firebase from "firebase"

export const createNewItem = (title, body, images, price, props) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('/api/shop', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    price: price
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            
            function uploadPic() {
                return new Promise(async (resolve) => {
                    for (var i = 0; i < images.length; i++) {
                        var imageFile = images[i];
                        // this.uploadImageAsPromise(imageFile, i+1);
                        const ref = firebase.storage().ref("items/" + data.id + '_' + i.toString())
                        await ref.put(imageFile)
                        let url = await ref.getDownloadURL()
                        urls.push(url)
                    }
                    resolve("upload")
                });
            }
            
            let urls = []
            await uploadPic()

            await fetch('/api/shop/' + data.id + '/pics', {
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