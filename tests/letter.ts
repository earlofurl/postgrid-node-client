import { PostGrid } from '../src/index'

(async () => {
  const client = new PostGrid({
    mail: process.env.POSTGRID_MAIL_API_KEY,
    addr: process.env.POSTGRID_ADDR_API_KEY,
  })

  console.log('creating a single Letter...')
  const what = {
    description: 'Cool new letter',
    pdf: 'https://icnaam.org/wp-content/uploads/2024/10/AIP-CP-2017-Troubleshooting.pdf',
    to: {
      firstName: 'Steve',
      lastName: 'Smith',
      companyName: 'Acme Rentals',
      addressLine1: '5454 West 34th Street',
      city: 'Indianapolis',
      provinceOrState: 'IN',
      postalOrZip: '46224',
      countryCode: 'US',
    },
    from: {
      firstName: 'John',
      lastName: 'Quincy',
      companyName: 'US Steel',
      addressLine1: '123 Main Street',
      city: 'Atlanta',
      provinceOrState: 'GA',
      postalOrZip: '12345',
      countryCode: 'US',
    },
  }

  const one = await client.letter.create(what)
  if (one.success) {
    console.log('Success!')
  } else {
    console.log('Error! Creating the letter failed, and the output is:')
    console.log(one)
  }

  if (one.success) {
    console.log('fetching a single Letter...')
    const two = await client.letter.get(one.letter!.id)
    if (two.success) {
      console.log('Success!')
    } else {
      console.log('Error! Fetching the letter failed, and the output is:')
      console.log(two)
    }
  }

  console.log('listing the first page of 40 Letters...')
  const tre = await client.letter.list()
  if (tre.success) {
    console.log(`Success! ${tre.letters!.data!.length} letters in the list`)
  } else {
    console.log('Error! Listing the letters failed, and the output is:')
    console.log(tre)
  }

  if (one.success) {
    console.log('deleting a single Letter...')
    const fou = await client.letter.delete(one.letter!.id)
    if (fou.success) {
      console.log('Success!')
    } else {
      console.log('Error! Deleting the letter failed, and the output is:')
      console.log(fou)
    }
  }

})()
