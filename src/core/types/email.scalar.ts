import { GraphQLScalarType, Kind } from 'graphql';

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

function validate(email: unknown): string | never {
  if (typeof email !== 'string' || !regex.test(email)) {
    throw new Error('invalid email format');
  }

  return email;
}

export const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'A email parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => {
    return ast.kind === Kind.STRING ? validate(ast.value) : null;
  },
});
