export interface UserResponseService {
  id: string;
  name: Name;
  department: string;
  city: string;
  token: string;
}

interface Name {
  first: string;
  last: string;
}
