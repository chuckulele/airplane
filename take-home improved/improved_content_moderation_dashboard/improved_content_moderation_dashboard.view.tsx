import { Button, Card, DescriptionList, Link, Stack, Table, Text, Title, useComponentState } from "@airplane/views";

const ImprovedContentModerationDashboard = () => {
  const reviews = useComponentState("reviews");
  const selectedReview = reviews.selectedRow;

  return (
    <Stack>
      <Title>Content Moderation Dashboard</Title>
        <Stack>
          <Table
            id = "reviews"
            title = "Pending reviews"
            defaultPageSize = {10}
            hiddenColumns = {["review_id", "created_at", "product_id", "customer", "rating", "helpful_count", "approved"]}
            task = "list_reviews"
            rowSelection = "single"
            columns={[
              { accessor: "title", label: "Title" }, 
              { accessor: "comment", label: "Comment" }, 
              { accessor: "word", label: "Possible banned word" },
              { accessor: "severity", label: "Severity" }
            ]}
          />

          { selectedReview && (
            <Table
              id = "review_update"
              title = "Do you need to update the review before approving it?"
              hiddenColumns = {["created_at", "customer", "rating", "review_id", "title", "product_id", "product_id_2", "created_at_2", "image", "helpful_count", "approved", "name", "average_rating"]}
              task = {{
                slug: "list_reviews_and_product_data",
                params: { review_id: selectedReview.review_id },
              }}
              columns={[
                { accessor: "title", label: "Title" }, 
                { accessor: "comment", label: "Comment", canEdit: true }
              ]}
              rowActions = {[
                {
                  slug: "update_review",
                  label: "Update",
                  refetchTasks: "list_reviews"
                }
              ]}
            />
          )}

          { selectedReview && (
            <Card>
              <Stack direction="row" spacing="xl">
                <Title order={3}>Review approval</Title>               
                </Stack>
                        
              <Stack direction="row" spacing="xs" justify="space-between" width="1/6" >
                <Text width="1/6" color="gray.9">{`Review ID:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.review_id}`} </Text>
                
                <Text width="1/6" color="gray.9">{`Posted on:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.created_at}`} </Text>

                <Text width="1/6" color="gray.9">{`Customer:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.customer}`} </Text>

                <Text width="1/6" color="gray.9">{`Rating:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.rating}`} </Text>

                <Text width="1/6" color="gray.9">{`Title:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.title}`} </Text>

                <Text width="1/6" color="gray.9">{`Comment:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.comment}`} </Text>
                
                <Text width="1/6" color="gray.9">{`Upvotes:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.helpful_count}`} </Text>
                
                <Text width="1/6" color="gray.9">{`Status:`} </Text>
                <Text width="5/6" color="gray.9">{`${selectedReview.approved}`} </Text>
              </Stack>
              <Stack direction="row" spacing="xl" justify="end">
                <Button 
                    preset="primary"
                    id="approveButton" 
                    task= {{ 
                      slug: "approve_review", 
                      params: { review_id: selectedReview.review_id },
                      refetchTasks: "list_reviews"
                      }}>
                    Approve
                  </Button>
                  <Button 
                    preset="danger"
                    id="rejectButton" 
                    task= {{ 
                      slug: "reject_review", 
                      params: { review_id: selectedReview.review_id },
                      refetchTasks: "list_reviews"
                      }}>
                    Reject
                  </Button>
                  </Stack>
              
            </Card>
          )}

        </Stack>
    </Stack>
  );    
};

export default ImprovedContentModerationDashboard;
