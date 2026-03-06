import { test, expect, vi} from 'vitest';

test("Tenta criar um usuario com nome e senha", async () => {
    const apiURL = "http://localhost:3000/api/users";

    const response = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Tadeuzinho", senha: "0000000" })
    })

    expect(response.status).toBe(201);

})