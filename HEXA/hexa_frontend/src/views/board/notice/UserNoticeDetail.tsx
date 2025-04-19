/** React */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";

/* Common */
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import { NoticeResponseDto } from "@/utils/apiService/type/board/NoticeResponseDto";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import Editor from "@/new_components/common/Editor";
import { useTranslation } from "react-i18next";
import BasicDateTime from "@/new_components/common/BasicDateTime";
import { UploadFileInfo, UploadFileStatus } from "@progress/kendo-react-upload";
import Header from "@/new_components/common/Header.tsx";

export default function UserNoticeDetail({id}: {id: number}) {
  const { t } = useTranslation();
  // const { state } = useLocation();
  // console.log('state', state);

  const [data, setData] = useState<NoticeResponseDto>({
    id: 0,
    title: "",
    description: "",
    showPopup: false,
    postStartDate: new Date(),
    postEndDate: new Date(),
    updatedAt: new Date(),
    updatedUserId: "",
    createdAt: new Date(),
    createdUserId: "",
    isPinned: 0,
    // popupCount?: 0,
    // noticeFileCount?: number;
    noticeFiles: ''
  })
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('');

  const setFiles = (list: any[]) => {
    const fileInfos: UploadFileInfo[] = [];
    for (let i = 0; i < list.length; i++) {
      const fileInfo: UploadFileInfo = {
        uid: list[i].fileId,
        name: list[i].fileName,
        size: 1000,
        status: UploadFileStatus.Selected,
        progress: 100,
        getRawFile: undefined,
        extension: '.' + list[i].extension,
      }
      fileInfos.push(fileInfo)
    }
    return fileInfos;
  }

  const getNoticeById = async (id: number) => {
    const response: NoticeResponseDto = await NoticeApiService().getNoticeById(BigInt(id));
    const file = setFiles(response.noticeFiles);
    const initData = {
      ...response,
      noticeFiles: file
    }
    setData(initData);
    setDescription(response.description);
    setIsLoading(false);
  }

  const handleFileClick = async (file: UploadFileInfo) => {
    const res = await NoticeApiService().fileDownload(file.uid);
  }

  useEffect(() => {
    const noticeId = id;
    setIsLoading(true);
    getNoticeById(noticeId!);
  }, []);

  return (
    <>
      {!isLoading &&
        <>
          {/* 공지사항 상세 */}
          <Header headName={t('board.notice_details')} descrption={""} />
          <Form
            initialValues={data}
            render={(formRenderProps: FormRenderProps) => (
              <section className="section">
                <FormElement>
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "40%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {/* 제목 */}
                          {t('board.title')}
                        </th>
                        <td>{data.title}</td>
                        <th scope="row">
                          {/* 등록일시 */}
                          {t('common.registration_datetime')}
                          </th>
                        <td>
                          <BasicDateTime value={data.createdAt} />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 내용 */}
                          {t('board.content')}
                        </th>
                        <td colSpan={3}>
                          <div
                            className="notice-cont"
                            dangerouslySetInnerHTML={{ __html: description }}
                          >
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 파일 첨부 */}
                          {t('board.attach_file')}
                        </th>
                        <td colSpan={3}>
                          <div className="notice-file-list">
                            {data.noticeFiles.map((file: UploadFileInfo) => (
                              <div key={file.uid} className="k-file-single">
                                <span className="k-file-info">
                                  <span
                                    className="k-file-name"
                                    onClick={() => handleFileClick(file)}
                                    role="button"
                                    tabIndex={0}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {file.name}
                                  </span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </FormElement>
              </section>
            )}
          />
        </>
      }
    </>
  );
}
