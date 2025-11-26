import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  vus: 30,
  duration: '60s',
  // iteration: 1,
  thresholds: {
    http_req_duration: ["p(90)<=90", "p(95)<=100"], // 90% das requisições devem ser respondidas em até 90ms, 95% em até 100ms
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  let responseMemberLogin = "";

  group("Fazendo login", function () {
    responseMemberLogin = http.post(
      "http://localhost:3000/members/login",
      JSON.stringify({
        username: "maria",
        password: "123456",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    check(responseMemberLogin, {
      "Login status deve ser igual a 200": (r) => r.status === 200,
    });
  });

  group("Listando meus empréstimos", function () {
    let responseBorrowLoans = http.get(
      "http://localhost:3000/loans/my-loans",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${responseMemberLogin.json("token")}`,
        },
      }
    );

    check(responseBorrowLoans, {
      "Meus Empréstimos status deve ser igual a 200": (r) => r.status === 200,
    });
  });

  group("Simulando o pensamento do usuário", function () {
    sleep(1); // User Think Time
  });
}
