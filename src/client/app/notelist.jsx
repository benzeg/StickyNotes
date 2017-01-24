var NoteList = ({notes, handleNoteListEntryTitleClick}) => (
	<div className="note-list media">
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

window.NoteList = NoteList;