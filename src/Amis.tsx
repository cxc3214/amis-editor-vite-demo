import { useState } from "react";
import { Editor,ShortcutKey } from "amis-editor";
// import { render as renderAmis } from "amis";
import {toast, Select} from 'amis';
import { SchemaObject } from "amis/lib/Schema";
import {currentLocale} from 'i18n-runtime';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import './scss/style.scss';

import {setDefaultTheme} from 'amis';

setDefaultTheme('cxd');


// import "amis/lib/themes/default.css";
// import "amis/lib/helper.css";
// import "amis/sdk/iconfont.css";
// import "amis-editor-core/lib/style.css";
// import "amis-ui/lib/themes/cxd.css";

import {Icon} from './icons/index';

import './editor/DisabledEditorPlugin.tsx';



export function Amis() {
    const [mobile, setMobile] = useState(false);
    const [preview, setPreview] = useState(false);

    // @ts-ignore
    const defaultSchema: SchemaObject = window["AMIS_JSON"] || {
        type: "page",
        body: "测试",
        title: "标题",
    };

    const [schema,] = useState(defaultSchema);

    let obj: any = defaultSchema;

    const onChange = (value: any) => {
        obj = value;
        console.log("change", obj);
    };

    const onSave = () => {
        console.log("保存", obj);
        // @ts-ignore
        window["saveAmis"] && window["saveAmis"](obj);

        toast.success('保存成功', '提示');
    };

    const editorLanguages = [
        {
            label: '简体中文',
            value: 'zh-CN'
        },
        {
            label: 'English',
            value: 'en-US'
        }
    ];
    const curLanguage = currentLocale(); // 获取当前语料类型


    function changeLocale(value: string) {
        localStorage.setItem('suda-i18n-locale', value);
        window.location.reload();
    }

    return (
        <div className="Editor-Demo">
            <div className="Editor-header">
                <div className="Editor-title">amis 可视化编辑器</div>
                <div className="Editor-view-mode-group-container">
                    <div className="Editor-view-mode-group">
                        <div
                            className={`Editor-view-mode-btn editor-header-icon ${
                                !mobile ? 'is-active' : ''
                            }`}
                            onClick={() => {
                                setMobile(false);
                            }}
                        >
                            <Icon icon="pc-preview" title="PC模式" />
                        </div>
                        <div
                            className={`Editor-view-mode-btn editor-header-icon ${
                                mobile ? 'is-active' : ''
                            }`}
                            onClick={() => {
                                setMobile(true);
                            }}
                        >
                            <Icon icon="h5-preview" title="移动模式" />
                        </div>
                    </div>
                </div>

                <div className="Editor-header-actions">
                    <ShortcutKey />
                    <Select
                        className="margin-left-space"
                        options={editorLanguages}
                        value={curLanguage}
                        clearable={false}
                        onChange={(e: any) => changeLocale(e.value)}
                    />
                    <div
                        className={`header-action-btn m-1 ${
                            preview ? 'primary' : ''
                        }`}
                        onClick={() => {
                            setPreview(!preview);
                        }}
                    >
                        {preview ? '编辑' : '预览'}
                    </div>
{/*                    {!preview && (
                        <div className={`header-action-btn exit-btn`} onClick={exit}>
                            退出
                        </div>
                    )}*/}
                </div>
            </div>
            <div className="Editor-inner">
                <Editor
                    // style={{ height: "calc(100% - 60px) !important" }}
                    preview={preview}
                    isMobile={mobile}
                    // 不加有纵向的滚动条
                    className="is-fixed"
                    onChange={onChange}
                    value={schema}
                    theme={"cxd"}
                    onSave={onSave}
                    actionOptions={{
                        showOldEntry: false
                    }}
                />
            </div>
        </div>
    );
}

export default Amis;