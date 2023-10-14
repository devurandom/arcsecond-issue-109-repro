import {
    between,
    char,
    regex,
    sepBy,
    sequenceOf,
    whitespace
} from "arcsecond";

const word = regex(/^\w+/);

const quotedString = between(char('"'))(char('"'))(regex(/^[^"]+/));

const attribute = sequenceOf([word, char("="), quotedString]).map(
    ([name, _, value]): [string, string] => [name, value]
);

const attributeList = sepBy(whitespace)(attribute).map(
    (values): [string, string][] => values
);

export const parse = (input: string) => attributeList.run(input);
