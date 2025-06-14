import { BASE_TITLE } from './constants';

class Service {
  setTitle(...sections: unknown[]) {
    document.title = [BASE_TITLE, ...sections].filter(Boolean).join(' | ');
  }
}

const titleService = new Service();

export default titleService;
