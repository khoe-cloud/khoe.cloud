
const assert = require('assert')
assert.ok(process.env.MAILCHIMP_API_KEY)
assert.ok(process.env.MAILCHIMP_LIST_ID)

const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

function memberSubscribe(email, ip) {
	return new Promise(function(resolve, reject) {
		console.log(`creating mailchimp subscriber: ${email}, ip: ${ip}`)

		mailchimp
			.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
				email_address: email,
				ip_opt: ip, // Save user IP to Mailchimp opt-in IP field. (correct since were not using double opt-in.)
				status: 'subscribed'
			})
			.then(results => {
				resolve(results)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
	})
}

module.exports = {
	memberSubscribe
}
