async function test() {
  try {
    const res = await fetch('https://scorenova-backend.onrender.com/api/v1/practice/subjects');
    console.log(res.status);
    console.log(await res.text());
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
