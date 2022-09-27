export interface NoteModel {
    sort:string;
    search:string; 
    selectedCategory:string;
    isLoading:boolean;
    isError:boolean;
    data:any[];
    nextPage?:number;
}

export interface SearchNoteModel{
  sort:string;
  search:string; 
  selectedCategory:string; 
  nextPage?:number;
}