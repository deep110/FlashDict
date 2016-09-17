# FlashDict
Sometimes, do you feel too lazy to search for a difficult word's meaning you encounter while reading a article on web. Then this extension can really solve your problem. It can get the meanings of the selected word instantly without opening the new tab and searching it manually.

## Preview
![preview](/static/02.png?raw=true)

## Usage
1. First clone the repo or download the source code. If you have a zip file, extract its contents.
2. Just drag the folder to extensions [page](chrome://extensions/). If its not allowing you to add the extension, just turn the developer mode on.
<br>
![developer_options](/static/01.png?raw=true)
3. Now you are ready to use the extension. Just double click on any word and voila you are good to go.

## Contributing

Please fork this repository and contribute back using
[pull requests](https://github.com/deep110/FlashDict/pulls).

Any contribution is appreciated.

## Future Improvements
* Replace alert dialog with a custom dialog hovering over the word.
* The dictionary API used does not handle plurals efficiently, so need to integrate a library with good database to remove plurals and unwanted letters from words like (peaceful-ly -> peaceful).
* In case of no meanings found, showing search result from wikipedia using [MediaWiki Api](https://www.mediawiki.org/wiki/API:Main_page).

## License

* [Apache Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

```
Copyright 2016 Deepankar Agrawal

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


