<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row">
            <div class="col-12" id="tabOne">
                <div><b>1.Get Login Token</b></div>
            </div>
            <div class="btn-toolbar mb-3" role="toolbar">
                <div class="divBox">
                    <div class="col-12">
                        <div class="txtHead">Method :</div>
                        <div>Post</div>
                    </div>
                    <div class="col-12">
                        <div class="txtHead">Url :</div>
                        <div>https://test-api.gamemarket.shop/api/v1/user/login/admin</div>
                    </div>
                    <div class="col-12">
                        <div class="txtHead">headers :</div>
                        <div>content-type application/json</div>
                    </div>
                    <!-- <div style="font-size:12px; color:red;">* Url มาจาก Withdraw ในหน้า Setting ที่หัวข้อ 3.1</div> -->
                </div>

                <div class="form-group col-12 ">
                    <lable><b>Request Body</b> </lable>
                </div>
                <div class="form-group col-9">
                    <div class="table-wrapper">
                        <table class="table" id="DataTable351">
                            <thead class="rgba-green-slight">
                                <tr>
                                    <th style="width: 20%" set-lan="html:Parameter" class="bRight txtCenter">Parameter</th>
                                    <th style="width: 15%" set-lan="html:Type" class="bRight txtCenter">Type</th>
                                    <th style="width: 40%" set-lan="html:Description" class="bRight txtCenter">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="bRight">username</td>
                                    <td class="bRight">String</td>
                                    <td class="bRight">Name Accout User</td>
                                </tr>
                                <tr>
                                    <td class="bRight">password</td>
                                    <td class="bRight">String</td>
                                    <td class="bRight">Password</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="koh-tab-content col-12">
                    <div class="koh-tab-content-body">
                        <div class="koh-faq form-group">
                            <div class="koh-faq-question form-group ">
                                <lable class="Point"><b set-lan="text:Example Request Body">Example Request Body</b><i class="fa fa-chevron-down" aria-hidden="true" style="margin-left: 2%; font-size: 1rem"></i></lable>
                            </div>
                            <div class="koh-faq-answer col-9">
                                <pre><code id="351A" style="border-radius: 0.375rem;" class="hljs json">{
        <span class="hljs-attr"><span class="hljs-attr">"username"</span></span>: <span class="hljs-string"><span class="hljs-string">"partner"</span></span>,
        <span class="hljs-attr"><span class="hljs-attr">"password"</span></span>: <span class="hljs-string"><span class="hljs-string">"Password@1"</span></span>,
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <lable><b>Response Body</b></lable>
                </div>
                <div class="form-group col-9">
                    <div class="table-wrapper">
                        <table class="table table-borderless table-striped" id="DataTable2">
                            <thead class="rgba-green-slight">
                                <tr>
                                    <th style="width: 20%" set-lan="html:Parameter" class="bRight txtCenter">Parameter</th>
                                    <th style="width: 15%" set-lan="html:Type" class="bRight txtCenter">Type</th>
                                    <th style="width: 40%" set-lan="html:Description" class="bRight txtCenter">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="bRight">code</td>
                                    <td class="bRight">Number</td>
                                    <td class="bRight">Result Code Reference.</td>
                                </tr>
                                <tr>
                                    <td class="bRight">msg</td>
                                    <td class="bRight">String</td>
                                    <td class="bRight">Information message.</td>
                                </tr>
                                <tr>
                                    <td class="bRight">token</td>
                                    <td class="bRight">String</td>
                                    <td class="bRight">Token</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <lable><b>Service Response Code</b></lable>
                </div>

                <div class="form-group col-9">
                    <div class="table-wrapper">
                        <table class="table table-borderless table-striped" id="DataTable2">
                            <thead class="rgba-green-slight">
                                <tr>
                                    <th style="width: 20%" set-lan="html:Parameter" class="bRight txtCenter">Parameter</th>
                                    <th set-lan="html:Description" class="txtCenter">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="bRight">0</td>
                                    <td>success</td>
                                </tr>
                                <tr>
                                    <td class="bRight">1000</td>
                                    <td>invalid data type</td>
                                </tr>
                                <tr>
                                    <td class="bRight">1180</td>
                                    <td>invalid login</td>
                                </tr>
                                <tr>
                                    <td class="bRight">1640</td>
                                    <td>invalid login admin role</td>
                                </tr>
                                <tr>
                                    <td class="bRight">1640</td>
                                    <td>invalid login admin role</td>
                                </tr>
                                <tr>
                                    <td class="bRight">1129</td>
                                    <td>can't create token</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="koh-tab-content col-12">
                    <div class="koh-tab-content-body">
                        <div class="koh-faq form-group">
                            <div class="koh-faq-question form-group ">
                                <lable class="Point"><b>Example Service Respond Code </b><i class="fa fa-chevron-down" aria-hidden="true" style="margin-left: 2%; font-size: 1rem"></i></lable>
                            </div>
                            <div class="koh-faq-answer col-9">
                                <pre><code id="351B" style="border-radius: 0.375rem;" class="hljs json">{
        <span class="hljs-attr"><span class="hljs-attr">"code"</span></span>: <span class="hljs-string"><span class="hljs-string">"0"</span></span>,
        <span class="hljs-attr"><span class="hljs-attr">"msg"</span></span>: <span class="hljs-string"><span class="hljs-string">"success"</span></span>,
        <span class="hljs-attr"><span class="hljs-attr">"token"</span></span>: <span class="hljs-string"><span class="hljs-string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzY5NzMzMTMsImlkIjoyLCJyb2xlIjoicGFydG5lciJ9.PT0M6uIOIiRFdwWNIHz4jR8x8SYJMl26WfTGPYwPzAE"</span></span>,
        <span class="hljs-attr"><span class="hljs-attr">"user"</span></span>:{
            <span class="hljs-attr"><span class="hljs-attr">"unique_id"</span></span>: <span class="hljs-string"><span class="hljs-string">"2021-09-21@05:32:28"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"id"</span></span>: <span class="hljs-string"><span class="hljs-string">"92e17ce5dffc720124fdf58db0b820a5"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"phone_number"</span></span>: <span class="hljs-string">""</span>,
            <span class="hljs-attr"><span class="hljs-attr">"email"</span></span>: <span class="hljs-string"><span class="hljs-string">""</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"first_name"</span></span>: <span class="hljs-string"><span class="hljs-string">"partner"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"last_name"</span></span>: <span class="hljs-string"><span class="hljs-string">"partner"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"user_name"</span></span>: <span class="hljs-string"><span class="hljs-string">"partner1"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"password"</span></span>: <span class="hljs-string"><span class="hljs-string">"zPBKlquuzjsheN3MERFYBXcAc8Ko__f0OyQ="</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"access_key"</span></span>: <span class="hljs-string"><span class="hljs-string">"9M8jKHT9g@*.()_+-!$G52"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"secret_key"</span></span>: <span class="hljs-string"><span class="hljs-string">"cvOzH*g7Dgc5wTwQBertB3ta"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"role"</span></span>: <span class="hljs-string"><span class="hljs-string">"partner"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"game_ctrl"</span></span>: <span class="hljs-string">[]</span>,
            <span class="hljs-attr"><span class="hljs-attr">"top_partner"</span></span><span class="hljs-string">: <span class="hljs-number">0</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"bank_name"</span></span>: <span class="hljs-string"><span class="hljs-string">""</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"account_number"</span>: <span class="hljs-string"><span class="hljs-string">""</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"created_at"</span></span>: <span class="hljs-string"><span class="hljs-string">"2021-11-03T17:16:36.604607+07:00"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"updated_at"</span></span>: <span class="hljs-string"><span class="hljs-string">"2021-11-12T16:47:27.502529+07:00"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"withdraw"</span></span>: <span class="hljs-string"><span class="hljs-string">"https://www.google.com/123456789123"</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"partner_pt"</span></span>: <span class="hljs-string"><span class="hljs-number">95</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"Game"</span></span>: <span class="hljs-string"><span class="hljs-literal">null</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"GameMemberAcc"</span></span>: <span class="hljs-string"><span class="hljs-literal">null</span></span>,
            <span class="hljs-attr"><span class="hljs-attr">"Transaction"</span></span>: <span class="hljs-string"><span class="hljs-literal">null</span></span>
        },
}</span></code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
export default {
    data() {
        return {};
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Login",
            subtitle: "Document",
        });
    },
};
</script>




