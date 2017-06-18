class GithubCard extends HTMLElement {

	constructor() {
		super();

		this.MAX_LIST_LENGTH = 9;
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.document = document.currentScript.ownerDocument;

		this.stringTemplate = this.document.querySelector('#card').innerHTML;
		this.listItemTemplate = this.document.querySelector('#card-li').innerHTML;

		Promise.resolve(this.attributes.profile.value)
			.then(this._fetchProfileDetails.bind(this))
			.then(this._fetchProfileRepositories.bind(this))
	}

	_renderRepos(repos) {
		console.log(repos);
		const generated = repos.map(repo => this._tmpl(this.listItemTemplate, repo));
		this.shadow.querySelector('.profile-repository-list').innerHTML = generated.join('');
	}

	_tmpl(str, data) {
		return str.replace(/\{\{(.*?)\}\}/g, (m, token) => data[token.trim()] );
	}

	_fetchProfileDetails(profile) {
		// const url = 'https://api.github.com/users/' + profile;
		const url = '../../mocks/github-piecioshka-profile.json';

		fetch(url, { method: 'GET' })
			.then(res => res.json())
			.then(profile => {
				this.shadow.innerHTML = this._tmpl(this.stringTemplate, profile);
			})
			.catch(err => console.log(err));

		return profile;
	}

	_fetchProfileRepositories(profile) {
		// const url = 'https://api.github.com/users/' + profile + '/repos';
		const url = '../mocks/github-piecioshka-repositories.json';

		return fetch(url, { method: 'GET' })
			.then(res => res.json())
			.then(repos => repos.sort(this._sortByPopularity))
			.then(repos => {
				repos.length = this.MAX_LIST_LENGTH
				return repos;
			})
			.then(repos => this._renderRepos(repos))
			.catch(err => console.log(err));
	}

	_sortByPopularity(repo1, repo2) {
		const star1 = repo1.stargazers_count;
        const star2 = repo2.stargazers_count;

        if (star1 < star2) {
            return 1;
        } else if (star1 > star2) {
            return -1;
        } else {
            return 0;
        }
	}
}

window.customElements.define('mm-github-card', GithubCard);