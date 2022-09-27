import { observable, action, computed, toJS, reaction } from "mobx";
import { NoteModel,SearchNoteModel } from "../Models/NoteModel";
import { RootStore } from "./RootStore";

export default class NotesStore {
    rootStore: RootStore;
    @observable notes: NoteModel = {
        sort: "",
        search: "",
        selectedCategory: "",
        isLoading: false,
        isError: false,
        data:[]
    };
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    


    @action getNotes(searchNoteModel:SearchNoteModel){

    }

    @action getMoreNotes(searchNoteModel:SearchNoteModel){

    }

    @action getCategories(){

    }


}

