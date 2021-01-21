export default class APIHandler {
  constructor() {
    this.dummyDate = [];
  }

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getCards() {
    if (this.dummyDate.length == 0) {
      return null;
    } else {
      return dummyDate;
    }
  }

  // TODO: 카드 객체 생성/추가 후 ID 반환
  async postCard(cardObj) {
    return Math.round(Math.random() * 10000).toString();
  }

  // TODO: ID로 카드 검색 후 내용,카테고리 수정
  async putCard(cardObj) {}

  // TODO: ID로 카드 검색 후 삭제
  async deleteCard(id) {}
}
// TODO: API 요청 컨테이너. Method, Path, Body 속성
class APIRequest {
  constructor(method, path, body = null) {
    //전체조회인 get의 경우 body가 불필요, 디폴트를 null
    this.method = method;
    this.path = path;
    this.body = body;
  }
}

//fetch//XMLHttpRequest와 같은 비슷한 API
// TODO: API 요청 컨테이너. Method, Path, Body 속성
const HOST = "https://vh5pukpzxh.execute-api.ap-northeast-2.amazonaws.com/prod";
class APIRequest {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = HOST + path;
    this.body = body;
  }
}
// TODO: API 호출 함수
const APIProcessor = async (request) => {
  try {
    const response = await fetch(request.url, {
      method: request.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json", //보낼 때 형식
        Accept: "application/json", //받을 때 형식
        "x-api-key": "XXNmmXO9be1rPTLAeLrXW5FqNvhlxLvv5RZ6fLBy",
      },
      body: request.body ? JSON.stringify(request.body) : null, // body data type must match "Content-Type" header
    });
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();
      case 204:
        return null;
      default:
        console.error(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
  return "Error";
};
