
# Lanaco FE zadatak




## Tehnologije

**Client:** React, TypeScript, MobX - state management

**Server:** [mockapi-io](https://mockapi.io/projects/641094f5b21ab59f3382f285)

**Ostale biblioteke:**

- [prettier](https://www.npmjs.com/package/prettier)
- [eslint](https://www.npmjs.com/package/eslint)
- [styled-components](https://www.npmjs.com/package/styled-components)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom/v/6.6.2)
- [moment](https://www.npmjs.com/package/moment)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-spinners](https://www.davidhu.io/react-spinners/)


## Environment Variables
Da bi pokrenuli projekat morate dodati environment variables u vas *.env* fajl. U projektu se nalazi primjer fajla *.env.example*. Uposto sam koristio free verziju mockapi-io (dozvoljavaju samo dvije tabele), tako da sam napravio dva account-a jer za zadatak trebaju 3 tabele: invoices, sellers i customers. Zbog toga imamo dva API BASE URL-a koje treba dodati u *.env* fajl:

REACT_APP_BASE_URL_1 (za invoices i sellers):
`https://6410933aff89c2e2d4e2b35f.mockapi.io/lanaco`

REACT_APP_BASE_URL_2 (za customers):
`https://641094f5b21ab59f3382f284.mockapi.io/lanaco`

**Kredencijali od account-a:**
- E-mail: dzino.djordje@yahoo.com (Password: test12345)
- E-mail: tkd_djole@yahoo.com (Password: test12345)

