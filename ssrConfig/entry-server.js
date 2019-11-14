import React from 'react';
import streamToPromise from 'stream-to-promise';
import { renderToNodeStream } from 'react-dom/server';
import AnyComponent from 'plugins/AnyComponent';
const serverRender = webData => {
    const rags = webData.rags || [];
    return (
        <div className="render-result">
            {rags.map((item, index) => {
                return (
                    <AnyComponent
                        key={index}
                        ragName={item.ragName}
                        options={item.options}
                    ></AnyComponent>
                );
            })}
        </div>
    );
};

export { serverRender, renderToNodeStream, streamToPromise };
