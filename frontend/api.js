export default class APIHandler {
  constructor() {}

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getCards() {
    const request = new APIRequest("GET", "/kanban/cards");
    const response = await APIProcessor(request);
    if (response !== "Error") {
      console.log(response);
      return response.Items;
    } else {
      return null;
    }
  }

  // TODO: 카드 객체 생성/추가 후 ID 반환
  async postCard(cardObj) {
    const request = new APIRequest("POST", "/kanban/cards", {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
    if (response !== "Error") {
      console.log(response);
      return response.Items;
    } else {
      return null;
    }
  }

  // TODO: ID로 카드 검색 후 내용,카테고리 수정
  async putCard(cardObj) {
    const request = new APIRequest("PUT", `/kanban/cards/${cardObj.id}`, {
      title: cardObj.title,
      category: cardObj.category,
    });
    const response = await APIProcessor(request);
  }

  // TODO: ID로 카드 검색 후 삭제
  async deleteCard(id) {
    const request = new APIRequest("DELETE", `/kanban/cards/${id}`);
    const response = await APIProcessor(request);
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
        "x-api-key": "nBst7SSvbS6BGi6jSSom256CYYLYqjh51NTj9h51",
      },
      body: request.body ? JSON.stringify(request.body) : null, // body data type must match "Content-Type" header
    });
    switch (response.status) {
      case 200: //get : List를 반환
      case 201: //create : id를 반환
        return await response.json(); //JSON으로 변환
      case 204: // 요청은 성공했으나 돌려줄 값이 없을때 update,delete
        return null;
      default:
        console.error(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
  return "Error";
};
