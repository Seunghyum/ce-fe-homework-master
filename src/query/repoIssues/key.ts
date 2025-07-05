const PREFIX = 'repoIssues'

const repoIssuesKey = {
  all: [PREFIX],
  list: (page: number, search?: string) => [PREFIX, page, search],
  detail: (id: string) => [PREFIX, 'detail', id],
}

export default repoIssuesKey
