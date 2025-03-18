export interface LayerType {
  visible: boolean;
  id: string;
  title: string;
  url: string;
  outFields: Array<string>;
  popupTemplate: {
    title: Function;
    content: string;
  };
}
