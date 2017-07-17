/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Conventions} from "doLittle/dependencyInversion/conventions/Conventions";
import Context from "./given/a_convention_that_can_resolve_anything";

describe("when asking if service can be resolved with convention that can resolve it", () => {
    let context = null;
    let result = null;

    beforeEach(() => {
        context = new Context();
        result = context.conventions.canResolve({}, "something");
    });

    it("should not be able to resolve", () => result.should.be.true);
});