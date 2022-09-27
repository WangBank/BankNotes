import NotesStore from "./NotesStore";

export class RootStore {
    notesStore: NotesStore;

  constructor() {
    this.notesStore = new NotesStore(this);
  }
}
