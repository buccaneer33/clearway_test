export abstract class Annotation {
  id: number = 0;
  sectionId: number = 0;
  x: number = 0;
  y: number = 0;
  content: string = '';
  isEditing = false;
  inFocus = false;

  constructor(){}

  remove(){}
  updateContent(content: string){
    this.content = content;
  }
  setNewPosition(x: number, y: number){
    this.x = x;
    this.y = y;
  }
}
