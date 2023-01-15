import { BodyValidator, checkRequestValidations } from "../../../lib/src/middlewares";
/**
 * @class budgetValidator
 */
class budgetValidator {

    /**
     * @method checkCreateBudget
     * @static
     * @returns {any[]}
     */
    static checkCreateBudget(): any[] {
    return [
        BodyValidator.checkNumeric("newBudget"),
        BodyValidator.checkNumeric("newSpentBudget"),
        BodyValidator.checkNonEmptyString("budgetDescription"),
        // BodyValidator.checkNonEmptyString("budgetTitle"),
        checkRequestValidations()
    ];
}
 
}


export default budgetValidator