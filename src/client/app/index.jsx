import React from 'react';
import {render} from 'react-dom';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
///////////////





///////////////
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(), notes: []};
    this.state.currentNote = this.state.editorState.getCurrentContent();
    this.onChange = (editorState) => this.setState({editorState});
  }
  ////


  ////

  _onBoldClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onUnderlineClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onItalicizeClick() {
  	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _toggleBulletPoints(){
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }
  _onSaveClick() {
    var note = this.state.editorState.getCurrentContent();
    var header = 'Entry ';
    var n = this.state.notes.length;
    note.id = n;
    note.title = header + n;
    this.state.notes.push(note);
  }

  _onNextClick() {
    var currNote = this.state.currentNote;
    var i = this.state.notes.indexOf(currNote);
    if (this.state.notes[i+1] !== undefined) {
      this.state.currentNote = this.state.notes[i+1];
    } else {
      this.state.currentNote = this.state.notes[0];
      console.log('onnextclick');
    }
  }


  _handleNoteListEntryTitleClick(note) {
    this.setState({
      currentNote: note
    });
  }



  render() {
    return (
    	<div id="content">
        <div className="row">
      		<div className="col-md-3">
            <button>Logout</button>
            <h2>Make a note!</h2>
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
              <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
              <button onClick={this._onItalicizeClick.bind(this)}>Italic</button>
              <div className='editor'>
           		  <Editor editorState=
    	       			 {this.state.editorState} 
    	       			 handleKeyCommand={this.handleKeyCommand}
    	       			 onChange={this.onChange}
                   spellCheck={true}
           			/>
              </div>
              <button onClick={this._onSaveClick.bind(this)}>Save</button>
              <button onClick={this._onNextClick.bind(this)}>Next</button>
           	</div>
          <div className="col-md-1">
            <NoteList
              handleNoteListEntryTitleClick={this._handleNoteListEntryTitleClick.bind(this)}
              notes= {this.state.notes}
            />
          </div>
          <div className="col-md-2">
            <NoteViewer
              note = {this.state.currentNote} />
          </div>
        </div>
      </div>
    );
  }
}

////////////////
//NOTE LIST/////
var NoteList = ({notes, handleNoteListEntryTitleClick}) => (
  <div className="note-list">
    {notes.map((note) =>
      <NoteListEntry
        key={note.id}
        note={note}
        handleNoteListEntryTitleClick={handleNoteListEntryTitleClick}
      />
    )}
  </div>
);

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};


///////////////
//NOTE LIST ENTRY
///////////////
var NoteListEntry = ({note, handleNoteListEntryTitleClick}) => (
  <div className="note-list-entry">
    <div className="note-list-entry-title"
      onClick={() => handleNoteListEntryTitleClick(note)}>
      {note.title}
    </div>
  </div>
);

NoteListEntry.propTypes = {
  note: React.PropTypes.object.isRequired
};


////////////
//NOTE VIEWER
////////////

var NoteViewer = ({note}) => (
      <div className='note-viewer'>
        <Editor editorState=
           {EditorState.createWithContent(note)} 
        />
      </div>
    );

///////
//RENDER///
///////////



render(<App/>, document.getElementById('app'));


