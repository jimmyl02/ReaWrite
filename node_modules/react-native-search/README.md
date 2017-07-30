# react-native-search-bar

The high-quality [iOS native search bar](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UISearchBar.html) for react native.

<img src="SearchBar.png"/>

## Installation

In your react native project, run `npm install react-native-search-bar --save`

To link this library, please follow the first two steps in the [Linking Libraries (iOS)](http://facebook.github.io/react-native/docs/linking-libraries-ios.html) guide on React Native website. The `.xcodeproj` file is in `node_modules/react-native-search-bar/`. In the end, you should have `RNSearchBar.xcodeproj` in the `Libaries` group on Xcode and `libRNSearchBar.a` in the `Link Binary With Libraries` section inside the `Build Phases` tab of your project target.

## Usage

```JSX
<Search
	ref='searchBar'
	placeholder='Search'
	onChangeText={...}
	onSearchButtonPress={...}
	onCancelButtonPress={...}
	/>
```

```javascript
this.refs.searchBar.focus();
```

There is an example project in the [SearchBarExample](SearchBarExample) directory.


## License

[MIT](http://isekivacenz.mit-license.org/)