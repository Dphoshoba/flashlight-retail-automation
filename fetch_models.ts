async function main() {
  try {
    const res = await fetch("http://localhost:3000/api/models");
    const data = await res.json();
    console.log("Models:", data);
  } catch (e) {
    console.error(e);
  }
}
main();
