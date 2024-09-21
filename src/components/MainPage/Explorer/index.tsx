"use client";

const extentionsIcons = {
  folder: "fa-folder",
  xlsx: "fa-file-excel",
  docx: "fa-file-word",
  pdf: "fa-file-pdf",
  zip: "fa-file-archive",
  svg: "fa-file-code",
  xml: "fa-file-code",
  mp4: "fa-file-video",
  mkv: "fa-file-video",
  mov: "fa-file-video",
  avi: "fa-file-video",
  mp3: "fa-file-audio",
  m4a: "fa-file-audio",
  wav: "fa-file-audio",
  ogg: "fa-file-audio",
  jpeg: "fa-file-image",
  jpg: "fa-file-image",
  png: "fa-file-image",
  gif: "fa-file-image",
  webp: "fa-file-image",
  ico: "fa-file-image",
  html: "fa-file-code",
  css: "fa-file-code",
  scss: "fa-file-code",
  js: "fa-file-code",
  ts: "fa-file-code",
  jsx: "fa-file-code",
  tsx: "fa-file-code",
  json: "fa-file-code",
  md: "fa-file-code",
  php: "fa-file-code",
  pptx: "fa-file-powerpoint",
  other: "fa-file",
  addNew: "fa-plus",
};

const Explorer = () => {
  return (
    <div className="explorer card">
      <div className="explorer-header d-flex items-center px-2">Files</div>
      <div className="explorer-content-wrapper">
        <div className="explorer-sidebar scrollable">
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-1" />
            <label
              htmlFor="file-1"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <div className="collapsible-contianer">
                <input type="checkbox" id="file-1-1" />
                <label
                  htmlFor="file-1-1"
                  className="collapsible-label d-flex items-center justify-between"
                >
                  <div>
                    <i className="fal fa-file mr-1"></i>
                    <span>File one</span>
                  </div>
                  <i className="fal fa-chevron-down"></i>
                </label>
                <div className="collapsible-content">
                  <p>HEllloo , its mee </p>
                  <p>
                    i was wondering if after all these years should like too
                    meet
                  </p>
                </div>
              </div>
              <div className="collapsible-contianer">
                <input type="checkbox" id="file-1-2" />
                <label
                  htmlFor="file-1-2"
                  className="collapsible-label d-flex items-center justify-between"
                >
                  <div>
                    <i className="fal fa-file mr-1"></i>
                    <span>File one</span>
                  </div>
                  <i className="fal fa-chevron-down"></i>
                </label>
                <div className="collapsible-content">
                  <p>HEllloo , its mee </p>
                  <p>
                    i was wondering if after all these years should like too
                    meet
                  </p>
                </div>
              </div>
              <div className="collapsible-contianer">
                <input type="checkbox" id="file-1-3" />
                <label
                  htmlFor="file-1-3"
                  className="collapsible-label d-flex items-center justify-between"
                >
                  <div>
                    <i className="fal fa-file mr-1"></i>
                    <span>File one</span>
                  </div>
                  <i className="fal fa-chevron-down"></i>
                </label>
                <div className="collapsible-content">
                  <p>HEllloo , its mee </p>
                  <p>
                    i was wondering if after all these years should like too
                    meet
                  </p>
                </div>
              </div>
              <div className="collapsible-contianer">
                <input type="checkbox" id="file-1-4" />
                <label
                  htmlFor="file-1-4"
                  className="collapsible-label d-flex items-center justify-between"
                >
                  <div>
                    <i className="fal fa-file mr-1"></i>
                    <span>File one</span>
                  </div>
                  <i className="fal fa-chevron-down"></i>
                </label>
                <div className="collapsible-content">
                  <p>HEllloo , its mee </p>
                  <p>
                    i was wondering if after all these years should like too
                    meet
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-2" />
            <label
              htmlFor="file-2"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-3" />
            <label
              htmlFor="file-3"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
          <div className="collapsible-contianer">
            <input type="checkbox" id="file-4" />
            <label
              htmlFor="file-4"
              className="collapsible-label d-flex items-center justify-between"
            >
              <div>
                <i className="fal fa-file mr-1"></i>
                <span>File one</span>
              </div>
              <i className="fal fa-chevron-down"></i>
            </label>
            <div className="collapsible-content">
              <p>HEllloo , its mee </p>
              <p>
                i was wondering if after all these years should like too meet{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="explorer-content scrollable">
          {Object.keys(extentionsIcons).map((i, k) => (
            <div className="explorer-item" key={k} tabIndex={-1}>
              <div className="explorer-item-thumbnail d-flex items-center justify-center">
                <i
                  className={`fal ${
                    extentionsIcons[i as keyof typeof extentionsIcons]
                  }`}
                ></i>
                <div className="explorer-item-menu d-flex justify-between items-center">
                  <div className="checkbox-wrapper">
                    <div className="round">
                      <input
                        type="checkbox"
                        name="files"
                        id={`checkbox-${i}`}
                        value={i}
                      />
                      <label htmlFor={`checkbox-${i}`}></label>
                    </div>
                  </div>
                  <button className="more-menu-button" type="button">
                    <i className="fal fa-ellipsis-h"></i>
                    <div className="more-menu-container">
                      <div className="more-menu-item items-center justify-start">
                        <i className="fal fa-pen"></i>
                        <span>Rename</span>
                      </div>
                      <div className="more-menu-item items-center justify-start">
                        <i className="fal fa-arrow-to-bottom"></i>
                        <span>Download</span>
                      </div>
                      <div className="more-menu-item items-center justify-start">
                        <i className="fal fa-trash"></i>
                        <span>Delete</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="explorer-item-name d-flex items-center justify-center">
                Folder
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Explorer;
