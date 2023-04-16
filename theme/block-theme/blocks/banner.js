import "./banner.scss";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";

wp.blocks.registerBlockType("blocks/banner", {
  title: "Banner",
  attributes: {
    imgID: { type: "number" },
    imgURL: { type: "string" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id });
    props.setAttributes({ imgURL: x.sizes.full.url });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div
        className="banner"
        style={
          props.attributes.imgURL
            ? { backgroundImage: `url('${props.attributes.imgURL}')` }
            : {}
        }
      >
        <h1>Welcome!</h1>
        <InnerBlocks
          allowedBlocks={["core/paragraph", "core/heading", "core/list"]}
        />
        <a href="#" className="btn">
          Start
        </a>
      </div>
    </>
  );
}

function SaveComponent(props) {
  return (
    <div
      className="banner"
      style={
        props.attributes.imgURL
          ? { backgroundImage: `url('${props.attributes.imgURL}')` }
          : {}
      }
    >
      <h1>Welcome!</h1>
      <InnerBlocks.Content />
      <a href="#" className="btn">
        Start
      </a>
    </div>
  );
}
