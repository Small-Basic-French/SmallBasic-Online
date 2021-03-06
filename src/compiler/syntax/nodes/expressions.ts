import { BaseSyntaxNode, TextRange } from "./syntax-nodes";
import { Token } from "./tokens";

export enum ExpressionSyntaxKind {
    UnaryOperator,
    BinaryOperator,
    ObjectAccess,
    ArrayAccess,
    Call,
    Identifier,
    NumberLiteral,
    StringLiteral,
    Parenthesis
}

export abstract class BaseExpressionSyntax extends BaseSyntaxNode {
    public constructor(
        public readonly kind: ExpressionSyntaxKind,
        public readonly range: TextRange) {
        super();
    }
}

export class UnaryOperatorExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly operatorToken: Token,
        public readonly expression: BaseExpressionSyntax) {
        super(ExpressionSyntaxKind.UnaryOperator, BaseSyntaxNode.CombineRanges(operatorToken.range, expression.range));
    }
}

export class BinaryOperatorExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly leftExpression: BaseExpressionSyntax,
        public readonly operatorToken: Token,
        public readonly rightExpression: BaseExpressionSyntax) {
        super(ExpressionSyntaxKind.BinaryOperator, BaseSyntaxNode.CombineRanges(leftExpression.range, rightExpression.range));
    }
}

export class ObjectAccessExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly baseExpression: BaseExpressionSyntax,
        public readonly dotToken: Token,
        public readonly identifierToken: Token) {
        super(ExpressionSyntaxKind.ObjectAccess, BaseSyntaxNode.CombineRanges(baseExpression.range, identifierToken.range));
    }
}

export class ArrayAccessExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly baseExpression: BaseExpressionSyntax,
        public readonly leftBracketToken: Token,
        public readonly indexExpression: BaseExpressionSyntax,
        public readonly rightBracketToken: Token) {
        super(ExpressionSyntaxKind.ArrayAccess, BaseSyntaxNode.CombineRanges(baseExpression.range, rightBracketToken.range));
    }
}

export class CallExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly baseExpression: BaseExpressionSyntax,
        public readonly leftParenToken: Token,
        public readonly argumentsList: BaseExpressionSyntax[],
        public readonly commasList: Token[],
        public readonly rightParenToken: Token) {
        super(ExpressionSyntaxKind.Call, BaseSyntaxNode.CombineRanges(baseExpression.range, rightParenToken.range));
    }
}

export class IdentifierExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly token: Token) {
        super(ExpressionSyntaxKind.Identifier, token.range);
    }
}

export class NumberLiteralExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly token: Token) {
        super(ExpressionSyntaxKind.NumberLiteral, token.range);
    }
}

export class StringLiteralExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly token: Token) {
        super(ExpressionSyntaxKind.StringLiteral, token.range);
    }
}

export class ParenthesisExpressionSyntax extends BaseExpressionSyntax {
    public constructor(
        public readonly leftParenToken: Token,
        public readonly expression: BaseExpressionSyntax,
        public readonly rightParenToken: Token) {
        super(ExpressionSyntaxKind.Parenthesis, BaseSyntaxNode.CombineRanges(leftParenToken.range, rightParenToken.range));
    }
}
