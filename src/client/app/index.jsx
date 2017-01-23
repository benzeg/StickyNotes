import React from 'react';
import {render} from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onBoldClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onUnderlineClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onItalicizeClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    return (
    	<div id="content">
    		<h1>NOTE EDITOR</h1>
    		<button onClick={this._onBoldClick.bind(this)}>Bold</button>
    		<button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
    		<button onClick={this._onItalicizeClick.bind(this)}>Italic</button>
    		<div className="editor">
       			 <Editor editorState=
	       			 {this.state.editorState} 
	       			 handleKeyCommand={this.handleKeyCommand}
	       			 onChange={this.onChange} 
       			/>
       		</div>
       	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));