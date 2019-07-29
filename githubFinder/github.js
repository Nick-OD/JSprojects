class GitHub{
  constructor(){
    this.client_id ='4cbc677afcf5f820c7cb';
    this.client_secret = '771ff7223efaac9c1fae84f494855db00455d96d';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);


    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    return{
      profile,
      repos
    }
  }
}