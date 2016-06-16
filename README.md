# Web-Bug
A tracking bot server.

----

## Installing
```
$ git clone https://github.com/HelloWorld017/web-bug.git
$ npm install
```

You can start it with `$ npm start`

## How to?
1. Add an image to your email, web, etc....  

2. If the image is loaded, your scripts will run.  

### Embedding images

```html
<img src="//url:port/tagName/data">
```
will give you a transparent 1x1 pixel gif.

----

## Creating scripts
1. Create an js file to your scripts folder.  
2. If your image is loaded, an event will be called.  
	You can listen to events using `global.events.on(eventName, callback)`

### List of events

#### track event
An event which is called when bugs detect any tag.

#### tag.* event
An event which is called when bugs detect given tag.

#### arguments
An object will be given to callback as arguments.
```
{
	request: Request object,
	tag: Tag,
	data: Data
}
```

### Example scripts
```js
global.events.on('tag.a', (data) => {
	console.log(data.data);
});
```
The data will logged when image which tag is 'a' is loaded.

----

## Environment Variables
* NODE_ENV: We recommends setting it to 'production'  
* PORT: The port of http web server. (default: 80)  
* HTTPS_PORT: The port of https web server. (default: 443)  
* CERT: If CERT is 'true', it opens http server.  
* KEY_LOCATION: The location of the key file. (default: key.pem)  
* CERT_LOCATION: The location of the certificate file. (default: cert.pem)  
