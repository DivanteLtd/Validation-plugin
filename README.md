# Validation-plugin
Forms validation with settings on data-* attributes based on jQuery Validation Plugin.

It's well supported by Magento (our primary usage for this plugin is to customize checkout). Works very well. See the live demo: https://github.com/DivanteLtd/Validation-plugin/blob/master/demo/index.html

Available validators: 
- PESEL, 
- NIP,
- REGON,
- email,
- digits,
- alnum,
- postcode,
- regexp.

Examples:

                                <div class="form-group">
                                    <label for="5501a1d625e3e"><span class="asterix">* </span>Alpha characters and numbers</label>
                                    <input type="text" class="form-control"
                                           name="field"
                                           required="required" data-type="alnum" id="5501a1d625e3e">
                                </div>
                                
                                
                                <div class="form-group">
                                    <label for="1501a1d625e3"><span class="asterix">* </span>Post code</label>
                                    <input type="text" class="form-control"
                                           name="field"
                                           required="required" data-type="postcode" id="1501a1d625e3">
                                </div>
                                <div class="form-group">
                                    <label for="01a1d625e3"><span class="asterix">* </span>Digits</label>
                                    <input type="text" class="form-control" data-type="digit" data-value-min="10" data-value-max="20"
                                           name="field"
                                           required="required" id="01a1d625e3">
                                </div>
                                
                                <div class="form-group">
                                    <label for="f111"><span class="asterix">* </span>PESEL</label>
                                    <input type="text" class="form-control"
                                           name="pesel"
                                           required="required" id="f111">
                                </div>
